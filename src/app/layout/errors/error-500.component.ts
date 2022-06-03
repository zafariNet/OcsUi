import { Component } from "@angular/core";

@Component({
    selector : 'ocs-error-500',
    template : `
 <section class="content" style="height: 500px ;">
      <div class="error-page align-bottom">
        <h2 class="headline text-danger">500</h2>

        <div class="error-content">
          <h3><i class="fas fa-exclamation-triangle text-danger"></i> Oops! Something went wrong.</h3>

          <p>
            We will work on fixing that right away.
            Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
          </p>
        </div>
      </div>
      <!-- /.error-page -->

    </section>
    `
})
export class Error500Component{

}