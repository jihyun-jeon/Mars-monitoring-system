import { NavLink } from 'react-router-dom'

type DetailMenuTabProps = {
  connect: string
  activeClassName: string
  icon: JSX.Element | null
  content: string | null
  textClassName: string
}

const DetailMenuTab = ({
  connect,
  activeClassName,
  icon,
  content,
  textClassName,
}: DetailMenuTabProps) => {
  return (
    <li>
      <NavLink
        to={connect}
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'flex items-center rounded-lg p-2 text-base font-normal text-bgPaper hover:bg-[#ffffff1a]'
        }
      >
        {icon}
        <span className={textClassName}>{content}</span>
      </NavLink>
    </li>
  )
}

export default DetailMenuTab
