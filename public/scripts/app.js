var Game = React.createClass({
  render: function() {
    return (
      <div className="card-container">
        <CardTable data={this.props.tableData} />
      </div>
    );
  }
});

var CardTable = React.createClass({
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
    rows = [];
    for(var i=0; i < 9; i++) {
      rows.push(<CardTableRow cols={this.listMatrix()[i]} />);
    }
    return rows;
  },
  render: function() {
    return (
      <div className="card-table">
        <table>
          { this.rowNodes() }
        </table>
      </div>
    );
  }
});

var CardTableRow = React.createClass({
  render: function() {
    var colsNode =  this.props.cols.map(function(colNum){
      return (
        <td>{colNum}</td>
        );
    });
    return (
      <tr>
        {colsNode}
      </tr>
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
