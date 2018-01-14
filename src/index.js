import React from 'react';
import ReactDOM from 'react-dom';
// import Geocoder from 'react-native-geocoding';
import './index.css';

// Geocoder.fallbackToGoogle('AIzaSyAOVii1kLwTbTvCx-tQFZq0yOG-63J6lE0');

 
// Geocoder.setApiKey('AIzaSyAOVii1kLwTbTvCx-tQFZq0yOG-63J6lE0'); // use a valid API key 


// Geocoder.getFromLocation("03475130")
// 		.then(json => {
//         	var location = json.results[0].geometry.location;
//         	// alert(location.lat + ", " + location.lng);
//       	})
//       	.catch(error => {
//         	alert(error);
//       	})

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
		// const mapBox = <MapBox cep={this.props.locale.cep} />
		return(
			<div className="col-sm-10 my-sm-2 maps-panel">
            	<button type="button" className="close" onClick={this._handleClick}>&times;</button>
				<p className="logradouro">{this.props.locale.logradouro}</p>
				<p>{this.props.locale.bairro}</p>
				<p>{this.props.locale.localidade} - {this.props.locale.uf}</p>
				<p>{this.props.locale.cep}</p>
				
			</div>
		)
	}
}

class MapError extends React.Component{
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
				<div className="alert alert-danger alert-dismissible fade show" role="alert">
				  <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this._handleClick}>
				    <span aria-hidden="true">&times;</span>
				  </button>
				  <strong>CEP Inválido!</strong> verifique se digitou o CEP correto.
				</div>	
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
		})
		.catch(error => {
			return ReactDOM.render(<MapError />, document.getElementById('map'));
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

// <input type="text" className="form-control" id="CEP" placeholder="03476-090" />