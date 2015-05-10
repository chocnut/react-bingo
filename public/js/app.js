var Game = React.createClass({
  render: function() {
    return (
      <div className="grid">
        <Grid data={this.props.tableData} />
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
    var tiles = this.listMatrix().map(function(numbers) {
      for(n in numbers) {
        placeHolder.push(<Tile data={numbers[n]} />);
      }
    });
    return placeHolder;
  },
  render: function() {
    return (
      <div>
        { this.rowNodes() }
      </div>
    );
  }
});

var Tile = React.createClass({
  render: function() {
    return (
      <div className="tile">
        {this.props.data}
      </div>
    );
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

React.render(<Game tableData={randomRows} />, document.getElementById('main'));
