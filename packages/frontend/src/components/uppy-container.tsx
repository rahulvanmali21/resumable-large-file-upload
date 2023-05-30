import React from 'react'

import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';

// Don't forget the CSS: core and the UI components + plugins you are using.
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css'
import Tus from '@uppy/tus';


const uppy = new Uppy().use(Tus, { endpoint: 'http://127.0.0.1:3000/uploads' });


const UpppyContainer = () => {
  return (
    <div>
        <Dashboard uppy={uppy} />
    </div>
  )
}

export default UpppyContainer