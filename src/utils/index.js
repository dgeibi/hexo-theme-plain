import { $, $$ } from './$'
import throttle from './throttle'
import depend from './depend'
import Events from './events'
import scroll from './scroll'

$.throttle = throttle
$.depend = depend
$.Events = Events
$.scroll = scroll
$.$ = $$

export { $ as default, $$ }
