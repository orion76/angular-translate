export const transSource = `
 <div class="content">
<h1 id="getting-started">Getting started<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#getting-started"><i class="material-icons">link</i></a></h1><aio-toc class="embedded" ng-version="7.0.0"><!----><div class="toc-inner no-print collapsed ng-star-inserted"><!----><!----><button aria-label="Expand/collapse contents" class="toc-heading embedded secondary ng-star-inserted" title="Expand/collapse contents" type="button" aria-pressed="false"> Contents <mat-icon class="rotating-icon mat-icon collapsed" role="img" svgicon="keyboard_arrow_right" aria-hidden="true"><svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg></mat-icon></button><ul class="toc-list embedded"><!----><!----><!----><!----><!----><!----><li title="Prerequisiteslink" class="h2 ng-star-inserted"><a href="guide/quickstart#prerequisites">Prerequisites</a></li><!----><!----><!----><li title="Node.jslink" class="h3 ng-star-inserted"><a href="guide/quickstart#nodejs">Node.js</a></li><!----><!----><!----><li title="npm package managerlink" class="h3 ng-star-inserted"><a href="guide/quickstart#npm-package-manager">npm package manager</a></li><!----><!----><!----><li title="Step 1: Install the Angular CLIlink" class="h2 secondary ng-star-inserted"><a href="guide/quickstart#step-1-install-the-angular-cli">Step 1: Install the Angular CLI</a></li><!----><!----><!----><li title="Step 2: Create a workspace and initial applicationlink" class="h2 secondary ng-star-inserted"><a href="guide/quickstart#step-2-create-a-workspace-and-initial-application">Step 2: Create a workspace and initial application</a></li><!----><!----><!----><li title="Step 3: Serve the applicationlink" class="h2 secondary ng-star-inserted"><a href="guide/quickstart#step-3-serve-the-application">Step 3: Serve the application</a></li><!----><!----><!----><li title="Step 4: Edit your first Angular componentlink" class="h2 secondary ng-star-inserted"><a href="guide/quickstart#step-4-edit-your-first-angular-component">Step 4: Edit your first Angular component</a></li><!----><!----><!----><li title="Final code reviewlink" class="h2 secondary ng-star-inserted"><a href="guide/quickstart#final-code-review">Final code review</a></li><!----><!----><!----><li title="Next stepslink" class="h2 secondary ng-star-inserted"><a href="guide/quickstart#next-steps">Next steps</a></li><!----></ul><!----><button aria-label="Expand/collapse contents" class="toc-more-items embedded material-icons collapsed ng-star-inserted" title="Expand/collapse contents" type="button" aria-pressed="false"></button></div></aio-toc>
<p>Welcome to Angular! Angular helps you build modern applications for the web, mobile, or desktop.  </p>
<p>This guide shows you how to build and run a simple Angular
app. You'll use the <a href="cli" title="CLI command reference">Angular CLI tool</a> to accelerate development,
while adhering to the <a href="guide/styleguide" title="Angular style guide">Style Guide</a> recommendations that
benefit <em>every</em> Angular project.</p>
<p>This guide takes less than 30 minutes to complete.
At the end of this guide—as part of final code review—there is a link to download a copy of the final application code. (If you don't execute the commands in this guide, you can still download the final application code.)</p>
<a id="devenv"></a>
<a id="prerequisites"></a>
<h2 id="prerequisites">Prerequisites<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#prerequisites"><i class="material-icons">link</i></a></h2>
<p>Before you begin, make sure your development environment includes <code>Node.js®</code> and an npm package manager. </p>
<a id="nodejs"></a>
<h3 id="nodejs">Node.js<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#nodejs"><i class="material-icons">link</i></a></h3>
<p>Angular requires <code>Node.js</code> version 8.x or 10.x.</p>
<ul>
<li>
<p>To check your version, run <code>node -v</code> in a terminal/console window.</p>
</li>
<li>
<p>To get <code>Node.js</code>, go to <a href="https://nodejs.org" title="Nodejs.org">nodejs.org</a>.</p>
</li>
</ul>
<a id="npm"></a>
<h3 id="npm-package-manager">npm package manager<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#npm-package-manager"><i class="material-icons">link</i></a></h3>
<p>Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as <a href="https://docs.npmjs.com/getting-started/what-is-npm">npm packages</a>. To download and install npm packages, you must have an npm package manager. </p>
<p>This Quick Start uses the <a href="https://docs.npmjs.com/cli/install">npm client</a> command line interface, which is installed with <code>Node.js</code> by default. </p>
<p>To check that you have the npm client installed, run <code>npm -v</code> in a terminal/console window.</p>
<a id="install-cli"></a>
<h2 id="step-1-install-the-angular-cli">Step 1: Install the Angular CLI<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#step-1-install-the-angular-cli"><i class="material-icons">link</i></a></h2>
<p>You use the Angular CLI
to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.</p>
<p>Install the Angular CLI globally. </p>
<p>To install the CLI using <code>npm</code>, open a terminal/console window and enter the following command:</p>
<code-example language="sh" class="code-shell" ng-version="7.0.0"><div style="display: none">
  npm install -g @angular/cli

</div><!----><aio-code><pre class="prettyprint lang-sh">      <!----><button class="material-icons copy-button no-print ng-star-inserted" title="Copy code snippet" aria-label="">
        <span aria-hidden="true">content_copy</span>
      </button>
      <code class="animated fadeIn"><span class="pln">npm install </span><span class="pun">-</span><span class="pln">g </span><span class="lit">@angular</span><span class="pun">/</span><span class="pln">cli</span></code>
    </pre></aio-code></code-example>
<a id="create-proj"></a>
<h2 id="step-2-create-a-workspace-and-initial-application">Step 2: Create a workspace and initial application<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#step-2-create-a-workspace-and-initial-application"><i class="material-icons">link</i></a></h2>
<p>You develop apps in the context of an Angular <a href="guide/glossary#workspace"><strong>workspace</strong></a>. A workspace contains the files for one or more <a href="guide/glossary/#project"><strong>projects</strong></a>. A project is the set of files that comprise an app, a library, or end-to-end (e2e) tests. </p>
<p>To create a new workspace and initial app project: </p>
<ol>
<li>
<p>Run the CLI command <code>ng new</code> and provide the name <code>my-app</code>, as shown here: </p>
<code-example language="sh" class="code-shell" ng-version="7.0.0"><div style="display: none">
  ng new my-app

</div><!----><aio-code><pre class="prettyprint lang-sh">      <!----><button class="material-icons copy-button no-print ng-star-inserted" title="Copy code snippet" aria-label="">
        <span aria-hidden="true">content_copy</span>
      </button>
      <code class="animated fadeIn"><span class="pln">ng new my</span><span class="pun">-</span><span class="pln">app</span></code>
    </pre></aio-code></code-example>
</li>
<li>
<p>The <code>ng new</code> command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key. </p>
</li>
</ol>
<p>The Angular CLI installs the necessary Angular npm packages and other dependencies. This can take a few minutes. </p>
<p>It also creates the following workspace and starter project files: </p>
<ul>
<li>A new workspace, with a root folder named <code>my-app</code></li>
<li>An initial skeleton app project, also called <code>my-app</code> (in the <code>src</code> subfolder)</li>
<li>An end-to-end test project (in the <code>e2e</code> subfolder)</li>
<li>Related configuration files</li>
</ul>
<p>The initial app project contains a simple Welcome app, ready to run. </p>
<a id="serve"></a>
<h2 id="step-3-serve-the-application">Step 3: Serve the application<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#step-3-serve-the-application"><i class="material-icons">link</i></a></h2>
<p>Angular includes a server, so that you can easily build and serve your app locally.</p>
<ol>
<li>
<p>Go to the workspace folder (<code>my-app</code>).</p>
</li>
<li>
<p>Launch the server by using the CLI command <code>ng serve</code>, with the <code>--open</code> option.</p>
</li>
</ol>
<code-example language="sh" class="code-shell" ng-version="7.0.0"><div style="display: none">
  cd my-app
  ng serve --open
</div><!----><aio-code><pre class="prettyprint lang-sh">      <!----><button class="material-icons copy-button no-print ng-star-inserted" title="Copy code snippet" aria-label="">
        <span aria-hidden="true">content_copy</span>
      </button>
      <code class="animated fadeIn"><span class="pln">cd my</span><span class="pun">-</span><span class="pln">app
ng serve </span><span class="pun">--</span><span class="pln">open</span></code>
    </pre></aio-code></code-example>
<p>The <code>ng serve</code> command launches the server, watches your files,
and rebuilds the app as you make changes to those files.</p>
<p>The <code>--open</code> (or just <code>-o</code>) option automatically opens your browser
to <code><a href="api/common/http" class="code-anchor">http</a>://localhost:4200/</code>.</p>
<p>Your app greets you with a message:</p>
<figure>
  <img src="generated/images/guide/cli-quickstart/app-works.png" alt="Welcome to my-app!" width="297" height="347">
</figure>
<a id="first-component"></a>
<h2 id="step-4-edit-your-first-angular-component">Step 4: Edit your first Angular component<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#step-4-edit-your-first-angular-component"><i class="material-icons">link</i></a></h2>
<p><a href="guide/glossary#component"><strong><em>Components</em></strong></a> are the fundamental building blocks of Angular applications.
They display data on the screen, listen for user input, and take action based on that input. </p>
<p>As part of the initial app, the CLI created the first Angular component for you. It is the <em>root component</em>, and it is named <code>app-root</code>. </p>
<ol>
<li>
<p>Open <code>./src/app/app.component.ts</code>. </p>
</li>
<li>
<p>Change the <code>title</code> property from <code>'my-app'</code> to <code>'My First Angular App'</code>.</p>
<code-example path="cli-quickstart/src/app/app.component.ts" region="component" header="src/app/app.component.ts" linenums="false" ng-version="7.0.0"><div style="display: none">
@<a href="api/core/Component" class="code-anchor">Component</a>({
  selector: 'app-root',
  templateUrl: './app.component.html',
  <a href="api/core/Component#styleUrls" class="code-anchor">styleUrls</a>: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App!';
}

</div><!----><header class="ng-star-inserted">src/app/app.component.ts</header><aio-code class="headed-code"><pre class="prettyprint lang-">      <!----><button class="material-icons copy-button no-print ng-star-inserted" title="Copy code snippet" aria-label="Copy code snippet from src/app/app.component.ts">
        <span aria-hidden="true">content_copy</span>
      </button>
      <code class="animated fadeIn"><span class="lit">@</span><a href="api/core/Component" class="code-anchor"><span class="lit">Component</span></a><span class="pun">({</span><span class="pln">
  selector</span><span class="pun">:</span><span class="pln"> </span><span class="str">'app-root'</span><span class="pun">,</span><span class="pln">
  templateUrl</span><span class="pun">:</span><span class="pln"> </span><span class="str">'./app.component.html'</span><span class="pun">,</span><span class="pln">
  </span><a href="api/core/Component#styleUrls" class="code-anchor"><span class="pln">styleUrls</span></a><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">'./app.component.css'</span><span class="pun">]</span><span class="pln">
</span><span class="pun">})</span><span class="pln">
</span><span class="kwd">export</span><span class="pln"> </span><span class="kwd">class</span><span class="pln"> </span><span class="typ">AppComponent</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
  title </span><span class="pun">=</span><span class="pln"> </span><span class="str">'My First Angular App!'</span><span class="pun">;</span><span class="pln">
</span><span class="pun">}</span></code>
    </pre></aio-code></code-example>
<p>The browser reloads automatically with the revised title. That's nice, but it could look better.</p>
</li>
<li>
<p>Open <code>./src/app/app.component.css</code> and give the component some style.</p>
<code-example path="cli-quickstart/src/app/app.component.css" header="src/app/app.component.css" linenums="false" ng-version="7.0.0"><div style="display: none">
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}


</div><!----><header class="ng-star-inserted">src/app/app.component.css</header><aio-code class="headed-code"><pre class="prettyprint lang-">      <!----><button class="material-icons copy-button no-print ng-star-inserted" title="Copy code snippet" aria-label="Copy code snippet from src/app/app.component.css">
        <span aria-hidden="true">content_copy</span>
      </button>
      <code class="animated fadeIn"><span class="pln">h1 </span><span class="pun">{</span><span class="pln">
  color</span><span class="pun">:</span><span class="pln"> </span><span class="com">#369;</span><span class="pln">
  font</span><span class="pun">-</span><span class="pln">family</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Arial</span><span class="pun">,</span><span class="pln"> </span><span class="typ">Helvetica</span><span class="pun">,</span><span class="pln"> sans</span><span class="pun">-</span><span class="pln">serif</span><span class="pun">;</span><span class="pln">
  font</span><span class="pun">-</span><span class="pln">size</span><span class="pun">:</span><span class="pln"> </span><span class="lit">250</span><span class="pun">%;</span><span class="pln">
</span><span class="pun">}</span></code>
    </pre></aio-code></code-example>
</li>
</ol>
<p>Looking good! </p>
<figure>
  <img src="generated/images/guide/cli-quickstart/my-first-app.png" alt="Output of Getting Started app" width="685" height="367">
</figure>
<a id="project-file-review"></a>
<h2 id="final-code-review">Final code review<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#final-code-review"><i class="material-icons">link</i></a></h2>
<p>You can <a href="generated/zips/cli-quickstart/cli-quickstart.zip" target="_blank">download an example</a> of the app that you created in this Getting Started guide. </p>
<div class="alert is-helpful">
<p><strong>Tip:</strong> Most Angular guides include links to download example files and run live examples in <a href="http://www.stackblitz.com">Stackblitz</a>, so that you can see Angular concepts and code in action. </p>
</div>
<p>For more information about Angular project files and the file structure, see <a href="guide/file-structure">Workspace and project file struture</a>.</p>
<h2 id="next-steps">Next steps<a title="Link to this heading" class="header-link" aria-hidden="true" href="guide/quickstart#next-steps"><i class="material-icons">link</i></a></h2>
<p>Now that you've seen the essentials of an Angular app and the Angular CLI, continue with these other introductory materials: </p>
<ul>
<li>
<p>The <a href="tutorial" title="Tour of Heroes tutorial">Tour of Heroes tutorial</a> provides additional hands-on learning. It walks you through the steps to build an app that helps a staffing agency manage a group of superhero employees.
It has many of the features you'd expect to find in a data-driven application: </p>
<p>        - Acquiring and displaying a list of items</p>
<p>        - Editing a selected item's detail</p>
<p>        - Navigating among different views of the data</p>
</li>
</ul>
<ul>
<li>The <a href="guide/architecture" title="Architecture guide">Architecture guide</a> describes key concepts such as modules, components, services, and dependency injection (DI). It provides a foundation for more in-depth guides about specific Angular concepts and features.  </li>
</ul>
<p>After the Tutorial and Architecture guide, you'll be ready to continue exploring Angular on your own through the other guides and references in this documentation set, focusing on the features most important for your apps. </p>

</div>
`;
