***On Board new Company***

***Setup new S3 bucket for angular:***
1. Each environment type will need one S3 bucket since we will need to point to separate API endpoints
2. Create S3 bucket with the format: EnvironmentType.Domain (For example, trial.acme)
```
Make sure to enable static website hosting
Make sure to set it to public
Update bucket policy
```
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::trial.acme/*"
        }
    ]
}
```

// Steps 3 to 5 are in pipeline already, we are adding here just for future references about manually publishing the app
3. Update environments file under public/src/environments
4. Build angular with the correct environment
```
ng build --configuration=trial
or
ng build --configuration=production
```
5. Push angular dist codes to the S3 bucket
```
aws s3 sync ../public/dist/staff-planner s3://trial.acme/
```

***Setup Node service:***
1. Create new application for the company
2. Create new ElasticBeanstalk environment for each environment (trial, prod, demo, staging)

// Steps 3 to 6 are in pipeline already, we are adding here just for future references about manually publishing the app
3. Update env.json to point to the right master database
4. Run npm install 
5. Run make_zip.sh 
6. Upload the zip file to Elastic Beanstalk

***Update bitbucket-pipelines***
1. Update the pipelines to include deployment for new company
2. Update environment variable in our bitbucket
