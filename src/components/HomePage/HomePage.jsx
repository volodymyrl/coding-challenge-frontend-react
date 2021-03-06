import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Filter from "../Filter";
import Pagination from "../Pagination";
import { Container } from "../ui/Layout/StyledLayout";
import Text from "../ui/Text";
import IncidentsList from "../IncidentsList";
import { incidentPropTypes } from "../../constants/propTypes";
import ErrorMessage from "../ui/ErrorMessage";
import ErrorBoundary from "../ErrorBoundary";

class HomePage extends Component {
  componentDidMount = () => {
    this.props.fetchIncidents();
  };

  changeSearchValue = ({ target: { value } }) => {
    const { changeUi } = this.props;
    changeUi({ name: "searchValue", value });
    changeUi({ name: "currentPage", value: 0 });
  };

  changeShowItemsPerPage = ({ target: { value } }) => {
    const { changeUi } = this.props;
    changeUi({ name: "itemsPerPage", value: Number(value) });
    changeUi({ name: "currentPage", value: 0 });
  };

  render() {
    const { incidents, isLoading, error, totalIncidentsLength, searchValue, itemsPerPage } = this.props;
    return (
      <ErrorBoundary>
        <Container>
          <Filter
            onChange={this.changeSearchValue}
            value={searchValue}
            disableInput={isLoading}
            totalIncidentsLength={totalIncidentsLength}
            itemsPerPage={itemsPerPage}
            changeShowItemsPerPage={this.changeShowItemsPerPage}
          />
          {!isLoading &&
            !error && (
              <Fragment>
                {totalIncidentsLength === 0 && <Text>No results</Text>}
                {totalIncidentsLength > 0 && (
                  <Fragment>
                    <IncidentsList items={incidents} />
                    <Pagination />
                  </Fragment>
                )}
              </Fragment>
            )}
          {isLoading && <Text>Loading ...</Text>}
          {!isLoading && error && <ErrorMessage message={error} />}
        </Container>
      </ErrorBoundary>
    );
  }
}

HomePage.propTypes = {
  incidents: PropTypes.arrayOf(incidentPropTypes).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  totalIncidentsLength: PropTypes.number.isRequired,
  searchValue: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  fetchIncidents: PropTypes.func.isRequired,
  changeUi: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  error: null
};

export default HomePage;
