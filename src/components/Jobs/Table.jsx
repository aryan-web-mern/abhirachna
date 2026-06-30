import React, { useEffect } from "react";
import styles from "./Jobs.module.css";

export const Table = ({ data = [], columns = [], loading }) => {
  return (
    data?.length > 0 ? (
      <table className={styles.jobTable}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={col.key || index}
              className={col.className ? styles[col.className] : ""}
            >
              <h4>{col.label}</h4>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "20px" }}
              >
                Loading...
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.jobRow}>
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key || colIndex}
                    className={
                      col.className
                        ? `label-medium ${col.className
                            .split(" ")
                            .map((cls) => styles[cls])
                            .join(" ")}`
                        : ""
                    }
                    data-label={col.label === "experience" ? `${col.label} years` : col.label}
                  >
                    {col.renderCell
                      ? col.renderCell(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </>
      </tbody>
    </table>
    ) : (
      <div className={styles.noJobsBox}>
        <h3>No Job listing found!</h3>
      </div>
    )
  );
};
