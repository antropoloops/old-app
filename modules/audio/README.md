# Antropoloops Audio Engine

## Google Storage Setup

TODO: move this information to another place

**cors**

```
gsutil cors set cors.json gs://atpls-sets
```

**Allow public read**

```
gsutil defacl ch -u AllUsers:R gs://atpls-sets
gsutil acl ch -u AllUsers:R gs://atpls-sets/continentes/**
```
