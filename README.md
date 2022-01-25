# Setup Maven Settings

Github action plugin to create a maven settings file under `/home/.m2/settings.xml`.

## Example

Here is how we can reference it from github action:

```
uses: @sv-oss/setup-environments-action@v1
with:
  activeProfiles: |
    ["test"]
  profiles: |
    [
      { 
        "id": "test", 
        "repositories": {
          "repository": [
            { "id": "central", "url": "https://repo1.maven.org/maven2" },
          ]
        }
      }
    ]
  servers: |
    [{ "id": "test", "username": "test", "password": "${env.GITHUB_TOKEN}" }]
```

## Inputs

- activeProfiles: List of active profiles in maven settings. Example: `["github"]`
- profiles: Profiles that will be registered under maven settings file. We can specify a list of external repositories here. Example:
```
  [
    { 
      "id": "github", 
      "repositories": {
        "repository": [
          { "id": "repo1", "url": "https://repo1.maven.org/maven2" },
          { "id": "repo2", "url": "https://repo2.maven.org", "snapshots": { "enabled": true } } }
        ]
      }
    }
  ]
```
- servers: List of servers settings. Example: `[{ "id": "test", "username": "test", "password": "${env.GITHUB_TOKEN}" }]`

## Build

Run: 

```
npm run all
```

## Release

Github action relies on tag to version its release. Here is how we can release the github action:
1. Ensure that the changes has been commited and pushed to github repo
2. Run git tag -fa <version_number> -m "Update <version_number> tag" && git push origin <version_number> --force.