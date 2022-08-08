import { Dispatch, SetStateAction } from 'react'
import './Pagination.css'

type PaginationProps = {
  total: number
  limit: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
  setLimit: Dispatch<SetStateAction<number>>
}

const Pagination = ({ total, limit, page, setPage, setLimit }: PaginationProps) => {
  const numPages = Math.ceil(total / limit)

  const buttonHandler = {
    prevMoveButton() {
      setPage((prev) => prev - 1)
    },

    doublePrevMoveButton() {
      setPage(1)
    },

    nextMoveButton() {
      setPage((next) => next + 1)
    },

    doubleNextMoveButton() {
      setPage(numPages)
    },

    currentMoveButton() {
      setPage(1)
    },
  }

  const {
    prevMoveButton,
    doublePrevMoveButton,
    nextMoveButton,
    doubleNextMoveButton,
    currentMoveButton,
  } = buttonHandler

  return (
    <div className="flex">
      <label>
        Rows per page
        <select
          className="ml-2 w-14 border py-1"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
          onClick={currentMoveButton}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={doublePrevMoveButton}
              disabled={page === 1}
              className="bg-bgDefault py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &lt;&lt;
            </button>
            <button
              onClick={prevMoveButton}
              disabled={page === 1}
              className="mr-6 bg-bgDefault py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
          </li>
          {Array(numPages)
            .fill(null)
            .map((_, i) => (
              <button
                className={
                  page === i + 1 ? 'page w-10 rounded-full bg-primary text-lg' : 'w-10 text-lg'
                }
                key={i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          <li>
            <button
              onClick={nextMoveButton}
              disabled={page === numPages}
              className="ml-6 bg-bgDefault py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
            <button
              onClick={doubleNextMoveButton}
              disabled={page === numPages}
              className=" bg-bgDefault py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
            >
              &gt;&gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
