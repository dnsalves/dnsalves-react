import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Geocoder.fallbackToGoogle('AIzaSyAOVii1kLwTbTvCx-tQFZq0yOG-63J6lE0');

class MapBox extends React.Component{

	async getData(){
		let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.locale.logradouro},${this.props.locale.localidade},${this.props.locale.uf}&key=AIzaSyAOVii1kLwTbTvCx-tQFZq0yOG-63J6lE0`
		return await fetch(url)
		.then((results) => { return results.json(); })
		.then(data => {			
			return data.results[0].geometry.location;
		});

	}

	render(){
  		let res = this.getData();
		return (
    		<div className="maps">
    			<div lat={res} lng={this.props.locale.lng} ></div>
  			</div>
		)
	}
}

class MapInfo extends React.Component{
	constructor() {
		super();

		this._handleClick = this._handleClick.bind(this);
	}
 
  	_handleClick() {
    	let mountNode = ReactDOM.findDOMNode(document.getElementById('map'));
	    ReactDOM.unmountComponentAtNode(mountNode);
  	}

	render(){
		return(
			<div className="col-sm-10 my-sm-2 maps-panel">
            <button type="button" className="close" onClick={this._handleClick}>&times;</button>
				<p className="logradouro">{this.props.locale.logradouro}</p>
				<p>{this.props.locale.bairro}</p>
				<p>{this.props.locale.localidade} - {this.props.locale.uf}</p>
				<p>{this.props.locale.cep}</p>
				<MapBox locale={this.props.locale} />
			</div>
		)
	}
}


class SearchBox extends React.Component{

	findAddress(){
		fetch(`https://viacep.com.br/ws/${document.getElementById('CEP').value}/json/`)
		.then((results) => { return results.json(); })
		.then(data => {
			return ReactDOM.render(<MapInfo locale={data} />, document.getElementById('map'));
		});
	}

	render(){
		return(
			<div className="background col-sm-10">
				<h5>Consultar</h5>
				<div className="form-inline">
					<div className="form-group">
						<label className="sr-only">CEP</label>
						<p className="form-control-static">CEP</p>
					</div>
					<div className="form-group mx-sm-2">
						<label htmlFor="CEP" className="sr-only">Cep</label>
						<input type="text" className="form-control" id="CEP" placeholder="03476-090" />
					</div>
					<Button onClick={() => this.findAddress()} />
				</div>
			</div>
		)
	}
}

class Button extends React.Component {

	render(){
  		return (<button type="submit" className="btn btn-primary" onClick={this.props.onClick}>Buscar</button>);
	}
}

ReactDOM.render(
  <SearchBox />,
  document.getElementById('root')
);