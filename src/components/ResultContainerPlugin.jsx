import React, { useRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { downloadExcel } from "react-export-table-to-excel";
var results;

createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

function filterResults(results) {
  let filteredResults = [];
  function addItemToUniqueArray(item, array) {
    // Check if an item with the same id already exists in the array
    const existingItem = array.find(
      (existing) => existing.decodedText === item.decodedText
    );

    // If the item doesn't exist, add it to the array
    if (!existingItem) {
      array.push(item);
    }
  }
  for (var i = 0; i < results.length; ++i) {
    addItemToUniqueArray(results[i], filteredResults);
  }

  return filteredResults;
}
const ResultContainerTable = ({ data }) => {
  results = filterResults(data);

  const tableRef = useRef(null);
  const header = ["Panel ID"];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "PanelID's",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        // accept two different data structures
        body: results,
      },
    });
  }

  const buttonStyle = {
    backgroundColor: "#2979ff",
    border: "none",
    color: "white",
    padding: "8px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "3px",
    cursor: "pointer",
  };

  const hoverStyle = {
    cursor: "pointer",
  };
  // eslint-disable-next-line react/prop-types
  const Export = () => (
    <button style={buttonStyle} onClick={handleDownloadExcel}>
      Export
    </button>
  );

  const columns = [
    { name: "Panel ID", selector: (row) => row.decodedText, width: 480 },
  ];
  const actionsMemo = React.useMemo(() => <Export />, []);

  return (
    <div className="container-xs">
      <DataTable
        ref={tableRef}
        columns={columns}
        data={results}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        pagination
        responsive
        subHeaderAlign="right"
        subHeaderWrap
        theme="solarized"
        actions={actionsMemo}
      ></DataTable>
    </div>
  );
};

const ResultContainerPlugin = (props) => {
  const results = filterResults(props.results);

  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({results.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={results} />
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
