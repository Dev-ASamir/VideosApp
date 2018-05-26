import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, ListView, ScrollView } from 'react-native';
import { employeeFetch } from '../actions';
import ListItem from './ListItem';


class EmployeeList extends React.Component {

    componentWillMount() {
        this.props.employeeFetch();
        //this.createDataSource(this.props);
    }

    // componentWillReceiveProps(nextProps) {
    //     // nextProps are the next set of props that this component
    //     // will be rendered with
    //     // this.props is still the old set of props

    //     this.createDataSource(nextProps);
    // }

    // createDataSource({ employees }) {
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 !== r2
    //     });

    //     this.dataSource = ds.cloneWithRows(employees);
    // }

    renderRow({item}) {
        return <ListItem employee={item} />;
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    data={this.props.employees}
                    keyExtractor={(i, idx)=> idx}
                    renderItem={this.renderRow}
                    // enableEmptySections
                    // dataSource={this.dataSource}
                    // renderRow={this.renderRow}
                />
            </ScrollView>
        );
    };
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });

    return { employees };
};

export default connect(mapStateToProps, { employeeFetch })(EmployeeList);