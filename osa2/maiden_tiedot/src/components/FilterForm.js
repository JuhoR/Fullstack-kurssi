import React from 'react'

const FilterForm = ({filter, handler}) => {
  return (
    <form>
    find countries <input value={filter} onChange={handler}/>
    </form>
  )
}

export default FilterForm
