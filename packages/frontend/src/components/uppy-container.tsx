import React from 'react'

import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';

// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css'


const uppy = new Uppy()


const UpppyContainer = () => {
  return (
    <div>
<Dashboard uppy={uppy} />
    </div>
  )
}

export default UpppyContainer