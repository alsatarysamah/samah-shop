
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


export default function Table({data,columns,rowEvents}) {


  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    nextPageText: '>',
    prePageText: '<',
    showTotal: false,
    selected:true,
    hideSizePerPage:true,//select from the  UI how many items per page
    alwaysShowAllBtns: true,
    
   
  });
  
  return (
    <div >
      <BootstrapTable responsive hover={true}   keyField='id' data={data}  columns={columns}  pagination={pagination} rowEvents={ rowEvents } />
    </div>
  );
}


