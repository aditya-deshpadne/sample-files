import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiBasicTable,
} from '@elastic/eui';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		
		searchTerm :'',
		resp : '',
		 selectedItems: [],
		
	};
		
	};
 onSelectionChange = (selectedItems) => {
    this.setState({ selectedItems });
		alert(selectedItems.length)
	   alert(selectedItems[0].id)
  };

  onSearchTextChange(event) {
	  
	  this.state.searchTerm = event.target.value;
  }
  
  searchData(){
	const { httpClient } = this.props;
    httpClient.post('../api/HelloWorld/update_test',{"searchterm" : this.state.searchTerm
	}).then((response) => {
      this.setState({ resp: response.data });
	  window.alert(this.state.resp);
	});
  }
   

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/HelloWorld/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  } 
   
   
  render() {
    const { title } = this.props;
	
	
	const selection = {
      onSelectionChange: this.onSelectionChange
    };

    const pageOfItems = [
      {
        id: "1",
        name: "john"
      },
      {
        id: "12",
        name: "Don"
      }
    ];
    const columns = [
      {
        field: "id",
        name: "id",
        truncateText: true
      },
      {
        field: "name",
        name: " Name",
        truncateText: true
      }
    ];
	
	
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1> Hello World!</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Congratulations</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>Custom Kibana Plugin!</h3>
                <p>The server time (via API call) is {this.state.time || 'NO API CALL YET'}</p>
              </EuiText>
			 <EuiForm >
				<EuiFormRow
					label="Search Field"
					helpText="Please enter search value"
				>
					<EuiFieldText name="search_term" onChange={(event) => this.onSearchTextChange(event)}/>
				</EuiFormRow>	
				
				<EuiButton  fill onClick={() => this.searchData()}>
					Search
				</EuiButton>
				
			</EuiForm>	
			<EuiBasicTable
			  items={pageOfItems}
			  itemId="id"
			  columns={columns}
			  isSelectable={true}
			  selection={selection}
			/>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
