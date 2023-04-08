import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import Dashboard from './Dashboard'
import BookAppointment from './BookAppointment'
import CreateDocuments from './CreateDocuments'
import ChatbotIntake from './ChatbotIntake'
import DocumentSelection from './DocumentSelection'
import DocumentReview from './DocumentReview'
import Payment from './Payment'
import Download from './Download'

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/book-appointment' component={BookAppointment} />
          <Route path='/create-documents' component={CreateDocuments} />
          <Route path='/chatbot-intake' component={ChatbotIntake} />
          <Route path='/document-selection' component={DocumentSelection} />
          <Route path='/document-review' component={DocumentReview} />
          <Route path='/payment' component={Payment} />
          <Route path='/download' component={Download} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
