import React, {Component} from 'react';
import axios from 'axios';

import GroupCreationWindow from "./GroupCreationWindow"
import SearchBar from 'material-ui-search-bar'
import Sort from "./AdditionalComponent/Sort";
import GroupItem from "./GroupItem";

import {API_URL, API_VERSION} from '../../constants';

class GroupList extends Component {
    state = {
        groups: [],
        filteredGroups: [],
        search: "",
        sortKey: "Name"
    };

    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/groups`, {
            withCredentials: true,
        })
            .then(res => {
                const groups = res.data.groups;
                this.setState({groups: groups, filteredGroups: groups})
            });
    };

    filterGroup = (groups, filter) => {
        return groups
    };

    searchGroups = (groups, search) => {
        if (search !== "") {
            let searchGroup = [];
            groups.forEach(group => {
                if (group.name.toLowerCase().includes(search.toLowerCase())) {
                    searchGroup.push(group)
                }
            });
            return searchGroup;
        }
        return groups;
    };

    handleSearch = (searchValue) => {
        let searchGroups = this.searchGroups(this.state.groups, searchValue);
        this.setState({filteredGroups: searchGroups})
    };

    sortGroups = (groups, sortKey, ascending) => {
        if (sortKey === 'By Name') {
            groups.sort((group1, group2) => {
                return group1.name.toLowerCase().localeCompare(group2.name.toLowerCase())
            });

            return ascending ? groups : groups.reverse()
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
                <div className="group-side-menu">
                    <Sort sortValue={["By Name"]}
                          handleSort={this.handleSort}/>
                    <GroupCreationWindow getData={this.getData}/>
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
                               className='group-search'/>

                    <div className='group-list'>
                        {
                            this.state.filteredGroups.map(group =>
                                <GroupItem item={group}
                                           key={group.id}/>
                            ).length === 0 ? <h2 className='group-not-found'>Nothing found</h2> :
                                this.state.filteredGroups.map(group =>
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
