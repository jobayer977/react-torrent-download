import React, { Component } from 'react';

 class ChildTest extends Component {
  render() {
    return (
      <div className="testName">
      	{this.props.name}
      	{
      		this.props.postsState.map(x => (
      			<ul key={x.id}>
      				<li>
      					{x.id}
      					{x.title}
      					{x.body}
      				</li>
      			</ul>
      			))
      	}
      </div>
    )
  }
}
export default ChildTest