const { Layer, Network } = require('synaptic')

const phase = name => console.log(`=== Phase "${name}" ===`);

Promise.resolve()
  .then(()=>{
    phase("0: create network layers")
    return {
      i: new Layer(2),
      h: new Layer(3),
      o: new Layer(1)
    }
  })
  .then(({ i, h, o })=>{
    phase("1: connect layers and create neural network")
    i.project(h);
    h.project(o);
    return new Network({
     input: i,
     hidden: [h],
     output: o
    });
  })
  .then((net)=>{
    phase("2: check current network state using XOR")
    console.log(net.activate([0,0]));
    console.log(net.activate([1,0]));
    console.log(net.activate([0,1]));
    console.log(net.activate([1,1]));
    return net
  })
  .then((net)=>{
    phase("3: train the network - learn XOR")
    // train the network - learn XOR
    var learningRate = .3;
    for (var i = 0; i < 20000; i++) {
      // 0,0 => 0
      net.activate([0,0]);
      net.propagate(learningRate, [0]);
      // 0,1 => 1
      net.activate([0,1]);
      net.propagate(learningRate, [1]);
      // 1,0 => 1
      net.activate([1,0]);
      net.propagate(learningRate, [1]);
      // 1,1 => 0
      net.activate([1,1]);
      net.propagate(learningRate, [0]);
    }
    return net
  })
  .then((net)=>{
    phase("4: check Trained network. XOR result")
    console.log(net.activate([0,0]));
    console.log(net.activate([1,0]));
    console.log(net.activate([0,1]));
    console.log(net.activate([1,1]));
  })
