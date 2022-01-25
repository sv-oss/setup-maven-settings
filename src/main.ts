import * as core from '@actions/core'
import fs from 'fs'
import {json2xml} from 'xml-js'
import os from 'os'
import path from 'path'

async function run(): Promise<void> {
  try {
    const activeProfiles = JSON.parse(core.getInput('activeProfiles') ?? '[]')
    const profiles = JSON.parse(core.getInput('profiles') ?? '[]')
    const servers = JSON.parse(core.getInput('servers') ?? '[]')

    const settingsPath = path.join(os.homedir(), '.m2', 'settings.xml')

    const settings = {
      activeProfiles: activeProfiles.map((activeProfile: unknown) => ({
        activeProfile
      })),
      profiles: profiles.map((profile: unknown) => ({profile})),
      servers: servers.map((server: unknown) => ({server}))
    }

    // core.setOutput('time', new Date().toTimeString())
    if (!fs.existsSync(path.dirname(settingsPath))) {
      fs.mkdirSync(path.dirname(settingsPath))
    }
    const settingsXml = json2xml(JSON.stringify(settings), {
      compact: true
    })
    fs.writeFileSync(
      settingsPath,
      `<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">${settingsXml}</settings>`
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
