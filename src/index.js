import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MapInfo extends React.Component{

	render(){
		return(<div>{this.props.cep}</div>)
	}
}


class SearchBox extends React.Component{


	findAddress(){
		fetch(`https://viacep.com.br/ws/${document.getElementById('CEP').value}/json/`)
		.then((results) => { return results.json(); })
		.then(data => {
			return ReactDOM.render(<MapInfo cep={data.cep} />, document.getElementById('map'));
		});
	}

	renderPanel() {
		return (<Panel onClick={() => this.findAddress()} />); 
	}

	render(){
		return(
			<div className="background col-md-10">
				<h5>Consultar</h5>
				<div className="form-inline">
					<div className="form-group">
						<label className="sr-only">CEP</label>
						<p className="form-control-static">CEP</p>
					</div>
					<div className="form-group mx-md-2">
						<label htmlFor="CEP" className="sr-only">Cep</label>
						<input type="text" className="form-control" id="CEP" placeholder="03476-090" />
					</div>
					{this.renderPanel()}
				</div>
			</div>
		)
	}
}

function Panel(props) {
  return (<button type="submit" className="btn btn-primary" onClick={props.onClick}>Buscar</button>);
}


ReactDOM.render(
  <SearchBox />,
  document.getElementById('root')
);