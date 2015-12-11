#! /usr/bin/env node

/*
 * electron-builder
 * https://github.com/loopline-systems/electron-builder
 *
 * Licensed under the MIT license.
 */

'use strict';

var fs      = require( 'fs' );
var meow    = require( 'meow' );
var assign  = require( 'lodash.assign' );
var path    = require( 'path' );

var builder = ( require( './' ) ).init();
var usage   = fs.readFileSync( path.join( __dirname, 'usage.txt' ) ).toString();

var cli = meow( usage, {
  help  : usage,
  alias : {
    h : 'help'
  }
} );

if ( cli.input[ 0 ] == null ) {

  console.error( usage );
  throw new Error( 'Path to electron app not provided' );

}

var appPath = path.resolve( process.cwd(), cli.input[ 0 ] );

builder.build( assign( {
  appPath : appPath
}, cli.flags ), function( error ) {
  if ( error ) {
    throw error;
  }

  console.log( '- Created installer for ' + cli.flags.platform + ' -' );
} );
