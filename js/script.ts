/// <reference types='../typings/three' /> 

import * as Detector from '../lib/Detector'
import { Engine } from './Engine'

const init = (): void => {

  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage()
    return
  }

  const engine: Engine = new Engine()

}

window.onload = init