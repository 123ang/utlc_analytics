import Dashboard from './_components/dashboard/dashboard.component'
import { pageMetadata } from './_data/_metadata'
import globalStyles from './global.module.scss'
import styles from './home.module.scss'

const {title, description} = pageMetadata.dashboard;

export const metadata = {title, description}

export default async function Home() {    

  return (
    <>
      <div className={globalStyles.BodyContainer}>
        <div className={globalStyles.TitleContainer}>
          <h6 className={globalStyles.TitleText}>Dashboard</h6> 
        </div>       
        <Dashboard />
      </div>
    </>
  )
}
