import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataConfig } from "./card";
import axios from "axios";
import "./styles.css"; // Import external CSS
import Loader from "./components/Loader";

const List = () => {
  const [cardData, setCardData] = useState([]);
  const [filterCardData, setFilterCardData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [config, setConfig] = useState({});
  const { type } = useParams();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const configData = dataConfig[type] || {};
        setConfig(configData);
        const apiUrl = configData?.apiLink;
        setLoading(true);
        let response = await axios.post(apiUrl);
        if (configData.apiResponse) {
          response = configData.apiResponse(response);
        }
        if (response) {
          setCardData(response);
          setFilterCardData(response);
          setFilterData(filterToData(configData?.filters, response));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsData();
  }, [type]);

  useEffect(() => {
    const fetchData = () => {
      let filteredData = cardData;
      if (filter) {
        filteredData = cardData.filter((item) => {
          return Object.keys(filter).every((key) =>
            filter[key] === ""
              ? true
              : item?.[key]?.toLowerCase().includes(filter[key]?.toLowerCase())
          );
        });
      }
      setFilterCardData(filteredData);
    };
    fetchData();
  }, [filter, cardData]);

  const handleFilter = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const handleOpenModal = () => {
    setShowFiltersModal(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          className="search-input flex-1"
          placeholder="Search by name..."
          onChange={(e) =>
            handleFilter(config?.searchByKey || "title", e.target.value)
          }
        />
        <button className="filter-button" onClick={handleOpenModal}>
          Filters
        </button>
      </div>
      {showFiltersModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="text-center flex-1">Apply Filters</h2>
              <span
                className="close"
                onClick={() => setShowFiltersModal(false)}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              {filterData &&
                Object.entries(filterData).map(([heading, options]) => (
                  <div key={heading} className="filter-section">
                    <h3>{heading}</h3>
                    {Array.isArray(options) && (
                      <select
                        onChange={(e) => handleFilter(heading, e.target.value)}
                        value={filter?.[heading] || ""}
                      >
                        <option value="">Select {heading}</option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
            </div>
            <div className="modal-footer">
              <button
                className="apply-button"
                onClick={() => setShowFiltersModal(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="card-container">
        {filterCardData?.map((e) => (
          <RenderCards key={e.id} obj={e} config={config} />
        ))}
      </div>
    </div>
  );
};

const RenderCards = ({ obj, config }) => {
  const navigate = useNavigate();
  return (
    <button
      className="card"
      style={{ backgroundColor: "#246DDC1A" }}
      onClick={() => {
        if (obj?.detailLink) {
          navigate(replaceUrlParam(config?.detailLink.replace, obj));
        } else if (obj?.id) {
          navigate(`/${config?.listLink}/${obj?.item_id}`);
        }
      }}
    >
      {config?.render ? (
        config.render(obj)
      ) : (
        <div>
          <h2>{obj?.title}</h2>
          <p>{obj?.description}</p>
        </div>
      )}
    </button>
  );
};

const replaceUrlParam = (url, object) => {
  const param = url.match(/:(\w+)/)[1];
  return url.replace(`:${param}`, object[param]);
};

const filterToData = (data, arr) => {
  let result = {};
  arr.forEach((item) => {
    data?.forEach((key) => {
      if (item?.[key]) {
        result[key] = result[key] || [];
        if (!result[key].includes(item[key])) {
          result[key].push(item[key]);
        }
      }
    });
  });
  return result;
};

export default List;
