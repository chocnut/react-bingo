var Game = React.createClass({
  render: function() {
    return (
      <div>
        <div className="grid">
          <Grid data={this.props.tableData} />
        </div>
      </div>
    );
  }
});

var Grid = React.createClass({
  listMatrix: function() {
    var matrix = [], k, i;
    var data = this.props.data
    for(i=0, k = -1; i < data.length; i++) {
      if(i % 10 === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(data[i]);
    }
    return matrix;
  },
  rowNodes: function() {
    var placeHolder = [];
    var that = this;
    var tiles = this.listMatrix().map(function(numbers) {
      for(n in numbers) {
        placeHolder.push(<Tile data={numbers[n]} key={numbers[n]} currentNumber={that.state.currentNumber} />);
      }
    });
    return placeHolder;
  },
  getInitialState: function() {
    var randomIndex = Math.floor(Math.random() * this.props.data.length);
    var number = this.props.data[randomIndex];
    return {currentNumber: number, lastCalledNumbers: [number], currentCount: 1};
  },
  updateCurrentNumberLabel: function() {
    var randomIndex = Math.floor(Math.random() * this.props.data.length);
    var number = this.props.data[randomIndex];

    if(this.state.currentCount === 90) {
      alert('All numbers have been called.');
      return;
    }

    if(this.state.lastCalledNumbers.indexOf(number) > -1) {
      return;
    }

    if(this.state.lastCalledNumbers.length === 5) {
      this.state.lastCalledNumbers.shift();
    }
    this.state.lastCalledNumbers.push(number);
    this.setState({currentNumber: number, lastCalledNumbers: this.state.lastCalledNumbers, currentCount: this.state.currentCount+1});
  },
  displayLastNumbers: function() {
     var node = [];
     this.state.lastCalledNumbers.map(function(number) {
        node.push(<NumberComponent number={number} />);
     });
     return node;
  },
  render: function() {
    return (
      <div>
        <div>
          <button onClick={this.updateCurrentNumberLabel}>Next!</button>
          <p>Current Number: {this.state.currentNumber}</p>
          { this.displayLastNumbers() }
        </div>
        { this.rowNodes() }
      </div>
    );
  }
});

var Tile = React.createClass({
  getInitialState: function() {
    var name = (this.props.data === this.props.currentNumber) ? 'tile active' : 'tile';
    return {className: name};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({className: 'tile active'});
  },
  shouldComponentUpdate:function(nextProps, nextState) {
    return nextProps.data === nextProps.currentNumber;
  },
  render: function() {
    return (
      <div className={this.state.className}>
        {this.props.data}
      </div>
    );
  }
});

var NumberComponent = React.createClass({
  render: function() {
    return (
      <div>
        <span>{this.props.number}</span>
      </div>
    )
  }
});

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
}

for (var a=[],i=0;i<90;++i) a[i]=i+1;
var randomRows = shuffle(a);

React.render(
    <Game tableData={randomRows} />,
    document.getElementById('main'));
