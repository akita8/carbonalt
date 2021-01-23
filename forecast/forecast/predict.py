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


def run(previous_two_days):
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    # these need to stay like this

    n_features = 14  # this is number of input time series
    n_timesteps = 48  # this is number of timesteps (hours)
    # initializing the object
    mv_net = MV_LSTM(n_features, n_timesteps, device).float().to(device)
    # insert the trained model from the saved dictionary
    mv_net.load_state_dict(torch.load("trained_energy"))
    mv_net.init_hidden(previous_two_days.unsqueeze(0).size(0))
    predictions = mv_net(previous_two_days.unsqueeze(0).float().to(device))

    return predictions
