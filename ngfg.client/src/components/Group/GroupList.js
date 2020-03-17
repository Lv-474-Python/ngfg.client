import React, {Component} from 'react';
import axios from 'axios';

import Button from "@material-ui/core/Button";
import Filter from "./AdditionalComponent/Filter";
import SearchBar from 'material-ui-search-bar'
import Sort from "./AdditionalComponent/Sort";
import GroupItem from "./GroupItem";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class GroupList extends Component {
    state = {
        groups: [],
        filteredGroups: [],
        filter: {
            'Published': false,
            'Draft': false
        },
        search: "",
        sortKey: "Name"
    };

    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/groups`, {
            withCredentials: true,
        })
            .then(res => {
                const groups = res.data.groups;
                console.log(groups)
                this.setState({groups})
            });
    };

    filterGroup = (groups, filter) => {
        let filteredGroups = [];
        let publishedFilter = filter['Published'];
        let draftFilter = filter['Draft'];

        if ((!publishedFilter && !draftFilter) || (publishedFilter && draftFilter)) {
            return groups;
        }

        groups.map(group => {
            if (group.isPublished && publishedFilter || !group.isPublished && draftFilter) {
                filteredGroups.push(group);
            }
        });

        return filteredGroups;
    };

    handleFilter = (filter) => {
        let searchGroups = this.searchGroups(this.state.groups, this.state.search);
        let filteredGroups = this.filterGroup(searchGroups, filter);
        this.setState({
            filter: filter,
            filteredGroups: filteredGroups
        });
    };

    searchGroups = (groups, search) => {
        if (search !== "") {
            let searchGroup = [];
            groups.map(group => {
                if (group.name.toLowerCase().includes(search.toLowerCase())) {
                    searchGroup.push(group)
                }
            });
            return searchGroup;
        }
        return groups;
    };

    handleSearch = (searchValue) => {
        let filteredGroups = this.filterGroup(this.state.groups, this.state.filter);
        let searchGroups = this.searchGroups(filteredGroups, searchValue);
        this.setState({ filteredGroups: searchGroups })
    };

    sortGroups = (groups, sortKey, ascending) => {
        if (sortKey === 'Name') {
            groups.sort((group1, group2) => {
                return group1.name.toLowerCase().localeCompare(group2.name.toLowerCase())
            });

            return ascending ? groups : groups.reverse()
        }
        if (sortKey === 'Date') {
            return groups
        }
    };

    handleSort = (sortKey, ascending) => {
        let filteredGroups = this.filterGroup(this.state.groups, this.state.filter);
        let searchGroups = this.searchGroups(filteredGroups, this.state.search);
        let sortedGroups = this.sortGroups(searchGroups, sortKey, ascending);

        this.setState({
            filteredGroups: sortedGroups
        })
    };

    componentDidMount() {
        this.getData();
    };

    render() {
        return (
            <div className='group-list-wrapper'>
                <div className="side-menu">
                    <Sort sortValue={["Name", "Date"]}
                          handleSort={this.handleSort}/>

                    <Filter filterName="Status"
                            checkboxValue={["Published", "Draft"]}
                            handleFilter={this.handleFilter}/>

                    <Button className="create-group-btn"
                            size='large'>
                        Create Group
                    </Button>
                </div>
                <div>
                    <SearchBar onChange={(newValue) => {
                                   this.handleSearch(newValue);
                                   this.setState({search: newValue});
                               }}
                               onRequestSearch={() => {
                                   this.handleSearch(this.state.search)
                               }}
                               value={this.state.search}
                               className='search'/>

                    <div className='group-list'>
                        {
                            this.state.groups.map(group =>
                                <GroupItem item={group}
                                          key={group.id}/>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupList;