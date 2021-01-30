import numpy as np
import torch


class MV_LSTM(torch.nn.Module):
    def __init__(self, n_features, seq_length, device):
        super(MV_LSTM, self).__init__()
        self.n_features = n_features
        self.seq_len = seq_length
        self.n_hidden = 256  # number of hidden states
        self.n_layers = 1  # number of LSTM layers (stacked)
        self.soft = torch.nn.Softplus()
        self.l_lstm = torch.nn.LSTM(
            input_size=n_features,
            hidden_size=self.n_hidden,
            num_layers=self.n_layers,
            batch_first=True,
        ).to(device)
        # according to pytorch docs LSTM output is
        # (batch_size,seq_len, num_directions * hidden_size)
        # when considering batch_first = True
        self.l_linear = torch.nn.Linear(
            self.n_hidden * self.seq_len, self.n_features
        ).to(device)
        self.device = device

    def init_hidden(self, batch_size):
        # even with batch_first = True this remains same as docs
        hidden_state = torch.zeros(self.n_layers, batch_size, self.n_hidden).to(
            self.device
        )
        cell_state = torch.zeros(self.n_layers, batch_size, self.n_hidden).to(
            self.device
        )
        self.hidden = (hidden_state, cell_state)

    def forward(self, x):
        batch_size, seq_len, _ = x.size()

        lstm_out, self.hidden = self.l_lstm(x, self.hidden)
        # lstm_out(with batch_first = True) is
        # (batch_size,seq_len,num_directions * hidden_size)
        # for following linear layer we want to keep batch_size dimension and merge rest
        # .contiguous() -> solves tensor compatibility error
        x = lstm_out.contiguous().view(batch_size, -1)
        x_lin = self.l_linear(x)
        return self.soft(x_lin)


def run(previous_two_days, path_to_model, hours_ahead=24):
    """
    input: the last available part of the data, hours to predict ahead
    output: predictions as hours_ahead x 13
    """
    previous_two_days = torch.from_numpy(previous_two_days)
    device = torch.device("cpu")

    n_features = 13
    n_timesteps = 48

    mv_net = MV_LSTM(n_features, n_timesteps, device).float().to(device)

    mv_net.load_state_dict(torch.load(path_to_model))

    # previous_two_days is the input to the model, needs to be a Tensor of shape [48, 13]

    predictions = []
    hours_length = previous_two_days.shape[0]
    mv_net.init_hidden(previous_two_days.unsqueeze(0).size(0))
    for i in range(hours_ahead):
        X = mv_net(previous_two_days.unsqueeze(0).float().to(device))
        predictions.append(X.data)
        previous_two_days.data[
            0: (hours_length - 1), :
        ] = previous_two_days.clone().data[1:hours_length, :]
        previous_two_days.data[-1, :] = X.clone().data

    # converting matrix from megawatts to kilowatts
    predictions_matrix = torch.cat(predictions, 0).detach().numpy()
    predictions_matrix = predictions_matrix / np.array(1000)

    return predictions_matrix
