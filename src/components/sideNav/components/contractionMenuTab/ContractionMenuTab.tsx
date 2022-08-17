import { NavLink } from 'react-router-dom'

type ContractionMenuTabProps = {
  connect: string
  activeClassName: string
  icon: JSX.Element | null
  content: string | null
}

const ContractionMenuTab = ({
  connect,
  activeClassName,
  icon,
  content,
}: ContractionMenuTabProps) => {
  return (
    <li>
      <NavLink
        to={connect}
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'flex items-center justify-center rounded-lg p-4 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
        }
      >
        {icon}
        {content}
      </NavLink>
    </li>
  )
}

export default ContractionMenuTab
