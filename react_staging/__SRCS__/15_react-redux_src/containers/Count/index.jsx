import CountUI from '../../component/Count'
// import store from '../../redux/store'
import { connect } from 'react-redux'
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'

function mapStateToProps(state) {
    return { state }
}

function mapDispatchToProps(dispatch) {
    return {
        addNumber: (data) => {
            dispatch(createIncrementAction(data))
        },
        subNumber: (data) => {
            dispatch(createDecrementAction(data))
        },
        addAsyncNumber: (data,time) => {
            dispatch(createIncrementAsyncAction(data,time))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
