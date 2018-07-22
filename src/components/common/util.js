/**
 * shorten a job class package name.
 * eg: com.example.jobs.ExampleJob => c.e.j.ExampleJob
 * @param jobClass
 */
export const shorten = function (jobClass) {
  return jobClass.split('.').map(function (e, i, arr) {
    return i < arr.length - 1 ?
      e.charAt(0) :
      e
  }).join('.')
}