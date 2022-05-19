export default function ({ route, redirect }) {
  // checks if params id is not empty
  if (!route.params.id) {
    return redirect('/')
  }
}
