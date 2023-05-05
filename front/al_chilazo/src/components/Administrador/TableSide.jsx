export function TableSide({ data }) {
  return (
    <table className="centered highlight">
      <thead>
        <tr>
          <th>{data.title}</th>
        </tr>
      </thead>
      <tbody>
        {data.values.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
