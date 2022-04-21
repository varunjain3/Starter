import React from "react";


class QGRSForm extends React.Component {
    constructor() {
        super();
        this.state = {
            ncbiId: null,
            fastaSeq: null
        };

        this.publish = this.publish.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    publish() {
        console.log(this.state.ncbiId, this.state.fastaSeq);
    }

    render() {
        return <div>
            <label htmlFor="exampleFormControlSelect1" className="col-form-label">Enter NCBI ID: </label>
            <input
                type="text"
                name="topicBox"
                className="form-control"
                placeholder="Ex: NR_152759.1"
                value={this.state.ncbiId}
                onChange={this.handleChange}
            />
            {/* <br /> */}
            <label htmlFor="exampleFormControlSelect1" className="col-form-label">Enter FASTA Sequence: </label>

            <div class="input-group">
                {/* <span class="input-group-text">With textarea</span> */}
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Fasta Sequence"
                    value={this.state.fastaSeq}
                    onChange={this.handleChange}
                />
            </div>
            <label htmlFor="exampleFormControlSelect1" className="col-form-label">Other Parameters: </label>
            <div className="row">

                <div className="input-group">
                    <span class="input-group-text">Max Length:</span>
                    <input className="form-control" type="number" id="maxLength" min="10" max="45" placeholder="30" />


                    <span class="input-group-btn" style={{ 'width-self': '10px' }} >  </span>
                    <span class="input-group-text">Min G-group: </span>
                    <input className="form-control" type="number" id="maxG" min="2" max="6" placeholder="2" />


                    <span class="input-group-text">Loop size: </span>
                    <input className="form-control" type="number" id="minLoop" min="0" max="36" placeholder="2"></input>
                    <span class="input-group-text">to</span>
                    <input className="form-control" type="number" id="maxLoop" min="0" max="36" placeholder="36"></input>
                </div>

            </div>
            <br />

            <button value="Send" className="btn btn-primary" onClick={this.publish}>Publish</button>
        </div>
    }
}

export default QGRSForm;