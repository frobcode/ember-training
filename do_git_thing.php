<?php

class NoWorkException extends Exception
{ }

$firstname = $_POST['fn'] ? $_POST['fn'] : "Content";
$lastname = $_POST['ln'] ? $_POST['ln'] : "Admin";
$email = $_POST['email'] ? $_POST['email'] : "atlas@freshbooks.com";


$response = do_merging();

echo json_encode($response);

function web_based_merging()
{
  $response = do_merging();
  json_encode($response);
  header("Content-type", "application/json");

  echo json_encode($response);
}

function do_merging()
{
  // this is called by the web page to format up the output suitably.
  $firstname = $_POST['fn'] ? $_POST['fn'] : "Content";
  $lastname = $_POST['ln'] ? $_POST['ln'] : "Admin";
  $email = $_POST['email'] ? $_POST['email'] : "atlas@freshbooks.com";
  try {
    do_merge($firstname, $lastname, $useremail);
  } catch(NoWorkException $nwe) {
    // we don't have anything to do!
    return array("status"=>"ok", "message"=>"No changes to be committed");
  } catch(Exception $e) {
    return array("status"=>"error", "message"=>$e->getMessage());
  }
  return array("status"=>"ok", "message"=>"Changes committed");
}

function do_merge($firstname, $lastname, $email, $origin="origin", $branch="master", $message="Automated content push")
{
  $authorship = "$firstname $lastname <$email>";
  do_git("git stash save --include-untracked 2>&1");
  do_git("git fetch $origin 2>&1");
  do_git("git merge --ff-only $origin/$branch 2>&1");
  try {
    // this one sometimes throws even if nothing needs to be done
    do_git("git stash pop 2>&1");
  } catch( Exception $e) {
    if ($e->getMessage() == "No stash found.") {
      // No stash found means that no files were updated, so we don't need to do anything
      throw new NoWorkException;
    }
    var_dump($e);
    throw $e;
  }
  do_git("git add --all :/ 2>&1");
  do_git("git commit -m \"$message\" --author=\"$authorship\" 2>&1");
  do_git("git push $origin $branch 2>&1");
}

function do_git($command)
{
  $status = 0;
  $output = array();
  exec($command, $output, $status);
  if ($status) {
    throw new Exception("Error executing command [$command]:  [" . join(",", $output). "]");
  }
}
