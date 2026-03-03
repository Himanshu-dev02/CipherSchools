import './ResultsTable.scss';

/**
 * Dynamic table component that renders query results.
 * Receives columns (array of column names) and rows (array of objects).
 */
const ResultsTable = ({ columns, rows }) => {
    if (!columns || columns.length === 0) {
        return null;
    }

    return (
        <div className="results-table">
            <div className="results-table__header">
                <span className="results-table__count">
                    {rows.length} row{rows.length !== 1 ? 's' : ''} returned
                </span>
            </div>
            <div className="results-table__wrapper">
                <table className="results-table__table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="results-table__th">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="results-table__row">
                                {columns.map((col) => (
                                    <td key={col} className="results-table__td">
                                        {row[col] !== null && row[col] !== undefined
                                            ? String(row[col])
                                            : 'NULL'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsTable;
