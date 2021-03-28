import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import LogItem from './LogItem'
import Preloader from '../layout/Preloader'
import PropTypes from 'prop-types'
import { getLogs } from '../../actions/logActions'

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs()
    // eslint-disable-next-line
  }, [])

  if (loading || logs === null) {
    return <Preloader />
  }

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
          <p className='center'>No logs to show...</p>
        ) : (
          logs.map((log) => <LogItem log={log} key={log.id} />)
        )}
      </ul>
    </div>
  )
}

Logs.ptopTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  // props from state(from index.js reducer)
  log: state.log,
  // OR CAN BRING SOME PARTS OF THE STATE:
  // logs: state.log.logs,
  //loading: state.log.loading
})

export default connect(mapStateToProps, { getLogs })(Logs)
