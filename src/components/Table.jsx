import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";

const CustomToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}


const Table = (props) => {
  return (
    <div style={{ height: 500, width: '100%', marginTop: '30px' }}>
      <DataGrid
        rows={props.data}
        columns={props.columns}
        slots={{ toolbar: CustomToolBar }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[10, 25, 100, 200]}
      />
    </div>
  );
}

export default Table