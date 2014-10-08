<?php

$firstname = $_POST['fn'] ? $_POST['fn'] : "Content";
$lastname = $_POST['ln'] ? $_POST['ln'] : "Admin";
$email = $_POST['email'] ? $_POST['email'] : "atlas@freshbooks.com";

do_merge($firstname, $lastname, $useremail);

function do_merge($firstname, $lastname, $useremail, $origin="origin", $branch="master", $message="Automated content push")
{
  $authorship = "$firstname $lastname <$email>";
  do_git("git stash save --include-untracked 2>&1");
  do_git("git fetch $origin 2>&1");
  do_git("git merge --ff-only $origin/$branch 2>&1");
  try {
    // this one sometimes throws even if nothing needs to be done
    do_git("git stash pop");
  } catch( Exception $e) {
    if ($e->getMessage() == "No stash found.") {
      // No stash found means that no files were updated, so we don't need to do anything
      throw new NoWorkException;
    }
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
  echo $command;
  exec($command, $output, $status);
  if ($status) {
    throw new Exception(join(",", $output));
  }
}
