import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RadioBtn(props) {
	return (
		<input
		  type="radio"
		  onClick={props.onClick}
			name={props.name}
			value={props.value}
			defaultChecked={props.dC}
		>
		</input>
	);
}

class RectangleCanvas extends React.Component {
  constructor(props) {
  	super(props);
  	this.canvasRef = React.createRef();
  }

  drawStuff() {
  	const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = this.props.size*1.618;
    let h = this.props.size;
    let a = this.props.triSize;
    ctx.fillStyle = '#ffff99';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = 'rgb(125, 125, 25)';
  	ctx.beginPath();
    ctx.moveTo(w/2-a/2, 0);
    ctx.lineTo(w/2+a/2, 0);
    let triHeight = a/2*Math.tan(degToRad(60));
    let adjTriHeight = triHeight*this.props.triHeight;
    ctx.lineTo(w/2, adjTriHeight);
    ctx.lineTo(w/2-a/2, 0);
    ctx.fill();
  }

  componentDidMount() {
  	this.drawStuff();
  }
  componentDidUpdate() {
  	this.drawStuff();
  }
  render() {
    return (
    	<canvas
        width={this.props.size*1.618 + 'px'}
        height={this.props.size + 'px'}
        ref={this.canvasRef}
        className='golden-rectangle'
      >
      </canvas>
    );
  }
}

class SizeSelector extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		size: 150,
  		triSize: 100,
  		triHeight: 1,
  	};
  }
	
	handleClick(e) {
		if(e.target.value === 'small') {
			if(e.target.name === 'rect') { 
        this.setState({size: 150});
      } else if(e.target.name === 'tri') {
      	this.setState({triSize: 100});
      } else if(e.target.name === 'triHeight') {
      	this.setState({triHeight: 1});
      }
    } else if(e.target.value === 'medium') {
      if(e.target.name === 'rect') { 
        this.setState({size: 250});
      } else if(e.target.name === 'tri') {
      	this.setState({triSize: 200});
      } else if(e.target.name === 'triHeight') {
      	this.setState({triHeight: 1.5});
      }
    } else if(e.target.value === 'large') {
			if(e.target.name === 'rect') { 
        this.setState({size: 350});
      } else if(e.target.name === 'tri') {
      	this.setState({triSize: 300});
      } else if(e.target.name === 'triHeight') {
      	this.setState({triHeight: 2});
      }
    }   
	}

	arrayOfRadioBtn(grpName) {
		let myArr = [];
		let sizes = ['small', 'medium', 'large'];
		let smMdLg = ['sm', 'md', 'lg'];
		for (let a = 0; a < 3; a++) {
			myArr.push(
				<span key={'span'+grpName+a}>
					<RadioBtn
				    onClick={e => this.handleClick(e)}
				    name={grpName}
				    value={sizes[a]}
				    
				    dC={(a === 0) ? true : false}
				  />
					<span>{smMdLg[a]}</span>
				</span>
			)
		}
		return myArr;
	}

	renderRectangleCanvas() {
		return (
			<RectangleCanvas
				size={this.state.size}
				triSize={this.state.triSize}
				triHeight={this.state.triHeight}
			/>
		);
	}

	render() {
		return (
			<div>
			  <span className='ctrlTitle'>Rectangle:</span>
        {this.arrayOfRadioBtn('rect')}
        <br />
        <span className='ctrlTitle'>Triangle:</span>
        {this.arrayOfRadioBtn('tri')}
        <br />
        <span className='ctrlTitle'>Triangle Height:</span>
        {this.arrayOfRadioBtn('triHeight')}
        <br />
        {this.renderRectangleCanvas()}
      </div>
		);
	}

}



// ========================================



ReactDOM.render(
  <SizeSelector />,
  document.getElementById('root')
);

function degToRad(degrees) {
	return degrees * Math.PI / 180;
};