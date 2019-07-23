import {fetchData} from "../query_auth.fetch"
import React from 'react'


class Index extends React.Component{
	state = {
		jsonResult: '',
	}

	tryFetchData = () => {
		console.log('start to fetch data')
		this.setState({
			jsonResult: 'Loading...',
		})
		const result = fetchData()
		result.then(data=>{
			// jsonResult = JSON.stringify(data)
			this.setState({
				jsonResult: JSON.stringify(data)
			})
		})
	}

	render(){
		return(
			<div>
				<button onClick={this.tryFetchData}>Fetch Data and show JSON</button>
				<div>
					<p>JSON:</p>
					{this.state.jsonResult}
				</div>
			</div>
		)
	}
}

export default Index
