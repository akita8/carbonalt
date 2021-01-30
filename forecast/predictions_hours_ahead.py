
# X is the input to the model, needs to be a Tensor of shape [48, 14]
def predict(X_init,hours_ahead=24):
     
    '''
    input: the last available part of the data, hours to predict ahead
    output: predictions as hours_ahead x 13
    '''
    predictions=[]
    hours_length=X_init.shape[0]
    mv_net.init_hidden(X_init.unsqueeze(0).size(0))
    for i in range(hours_ahead):
        X=mv_net(X_init.unsqueeze(0).float().to(device))
        predictions.append(X.data)
        X_init.data[0:(hours_length-1),:]=X_init.clone().data[1:hours_length,:]
        X_init.data[-1,:]=X.clone().data
    
    return torch.cat(predictions,0)
        
predictions=predict(X_test_example)

    