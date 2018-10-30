import React, { Component } from 'react';
 
class Tracks extends Component {
    
    render() {
        return(
            <div>
                {this.props.item.track.name}
            </div>
        )
    }

}

export default Tracks;