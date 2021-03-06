import React from 'react'
import CafFirstFloor from './CafFirstFloor'
import { Link } from 'react-router-dom'
import Legend from './Legend'

class ConfirmSelectedTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableSelected: false,
            tableConfirmed: false,
        }
        this.selectedTableID = this.props.match.params.tableID
    }

    handleSelectTable(key) {
        this.setState({
            tableSelected: true,
            tableConfirmed: false,
            selectedTableID: key,
            linkCopied: false,
        })
    }

    handleTableConfirmed() {
        this.setState({
            tableConfirmed: true,
            tableSelected: false,
        })
    }

    handleCopyLink() {
    }

    render() {
        const selectedTableID = this.props.match.params.selectedTableID
        const sentUrl = this.props.match.params.sentUrl 
        return(
            <div>
                <div>
                    {this.state.tableConfirmed || sentUrl ?
                    <h1 className="header">I'm Sitting at the <br /><span className="purple">Purple</span> Table</h1>
                     :
                     <h1 className="header">Tap the Table <br />your Sitting at</h1>
                    }
                </div>
                <CafFirstFloor 
                    clickable={true}
                    onSelectTable={this.handleSelectTable.bind(this)}
                    selectedTableID={selectedTableID}
                />
                <Legend />
                {
                    this.state.tableSelected ?
                    <Link to={`/1/${this.state.selectedTableID}`} onClick={this.handleTableConfirmed.bind(this)}>
                        <div className="confirm-button">Confirm</div>
                    </Link>
                    : 
                    null
                }
                {
                    this.state.tableConfirmed ?
                    <div class="confirm-button">
                        <p>Share this link to your friends</p>
                        <input type="text" className="share-link" value={`${window.location.href}/true`} />
                        <button onClick={navigator.clipboard.writeText(`${window.location.href}/true`)}>Copy</button>
                    </div>
                    :
                    null
                }
                {
                    sentUrl ?
                    <p className="link-copyied">Link Copied!</p>
                    :
                    null
                }
            </div>
        )
    }
}

export default ConfirmSelectedTable;