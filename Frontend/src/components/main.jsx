import React from "react";
import EmployeeForm from "./form";
import MakeTable from "./table";

export default function Main() {
  const [allEmployeeData, setAllEmployeeData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const [lastPage, setLastPage] = React.useState();

  const addEmployeeToDB = async (employeeData) => {
    try {
      await fetch(`http://localhost:3002/employeeDetails`, {
        method: "POST",
        body: JSON.stringify(employeeData),
        headers: { "Content-Type": "application/json" },
      });
      getEmployeeData();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const getEmployeeData = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `http://localhost:3002/employeeDetails?_page=${page}&_limit=4`
      );
      let result = await response.json();
      setAllEmployeeData(result);

    
      let last = response.headers.get("X-Total-Count");
      setLastPage(Math.ceil(last / 5));
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  const handlePage = (value) => {
    setPage(page + value);
    // console.log(page);
  };

  React.useEffect(() => {
    getEmployeeData();
  }, [page]);

  return (
    <>
      <EmployeeForm addEmployeeToDB={addEmployeeToDB} />
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>Something went wrong</h1>
      ) : (
        <MakeTable
          allEmployeeData={allEmployeeData}
          handlePage={handlePage}
          page={page}
          lastPage={lastPage}
        />
      )}
    </>
  );
}
