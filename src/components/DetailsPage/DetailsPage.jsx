import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import formatTimeStampToDate from "../../helpers/formatDate";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { DetailsInfo } from "./StyledDetailsPage";
import { Container } from "../ui/Layout/StyledLayout";
import { incidentPropTypes } from "../../constants/propTypes";

class DetailsPage extends Component {
  componentDidMount = () => {
    const {
      match: {
        params: { id }
      },
      fetchIncidentById
    } = this.props;
    fetchIncidentById(id);
  };

  render() {
    const { isLoading, item, error } = this.props;
    const { id, title, description, address, occurred_at } = item;
    const showItemCondition = !isLoading && !error && id;
    return (
      <Container>
        {showItemCondition && (
          <DetailsInfo>
            <Heading level={3}>{title}</Heading>
            <Text>
              <b>Stolen</b> {formatTimeStampToDate(occurred_at)} <b>at</b> {address}
            </Text>
            {description && (
              <Fragment>
                <Heading level={5}>Description of incident</Heading>
                <Text>{description}</Text>
              </Fragment>
            )}
          </DetailsInfo>
        )}
        {isLoading && <Text>Loading ...</Text>}
        {!isLoading && error && <ErrorMessage message={error} />}
      </Container>
    );
  }
}

DetailsPage.propTypes = {
  item: incidentPropTypes.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

DetailsPage.defaultProps = {
  error: null
};

export default DetailsPage;
