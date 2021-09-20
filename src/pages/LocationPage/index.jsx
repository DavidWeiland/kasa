import '../../styles/App.css'
import FicheLocation from '../../components/FicheLocation'
import { withRouter } from 'react-router';
import React from 'react';
import PropTypes from "prop-types"

class Location extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            isLoading: false,
        }
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        fetch("./../kasaData.json")
            .then((response) =>
                response.ok
                    ? response.json()
                    : console.error("code: ", response.status)
            )
            .then((data) =>
                this.setState({
                    locations: data.locationsList,
                    isLoading: false,
                })
            )
            .catch((error) => console.log(error))
    }

    render() {
      const { locations, isLoading } = this.state
      const{match} = this.props
      const idLocation = match.params.idLocation
        if (isLoading) {
            return (
                <h1>
                    loading data : {idLocation} en cours...
                </h1>
            )
        } else {
            return (
                <div className="body">
                    {locations
                        .filter((location) => location.id === idLocation)
                        .map(
                            ({
                                index,
                                id,
                                title,
                                pictures,
                                description,
                                host,
                                rating,
                                location,
                                equipments,
                                tags,
                            }) => (
                                <FicheLocation
                                    key={`${id}-${index}`}
                                    id={id}
                                    title={title}
                                    pictures={pictures}
                                    description={description}
                                    host={host}
                                    rating={rating}
                                    location={location}
                                    equipments={equipments}
                                    tags={tags}
                                />
                            )
                        )}
                </div>
            )
        }
    }
}

const LocationPage = withRouter(Location)
export default LocationPage