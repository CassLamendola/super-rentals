import { module, test } from 'qunit';
import { visit, currentURL, click, render } from '@ember/test-helpers';
import { setupApplicationTest, setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  
  test('should show rentals as the home page', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });

  test('should link to information about the company', async function(assert) {
    await visit('/');
    await click(".menu-about");
    assert.equal(currentURL(), '/about', 'should navigate to about page');
  });

  test('should link to contact information', async function(assert) {
    await visit('/');
    await click(".menu-contact");
    assert.equal(currentURL(), '/contact', 'should navigate to contact page');
  });

  test('should list available rentals', async function(assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should list 3 properties');
  });

  test('should filter the list of rentals by city', async function(assert) {
    assert
  });
});

module('Integration | Component | list rentals', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.rental = EmberObject.create({
      image: 'fake.png',
      title: 'test-title',
      owner:'test-owner',
      type: 'test-type',
      city: 'test-city',
      bedrooms: 3
    });
  });

  test('should show details for a selected rental', async function(assert) {
    await render(hbs`{{rental-listing rental=rental}}`);
    assert.equal(this.element.querySelector('.listing h3').textContent.trim(), 'test-title', 'Title: test-title');
    assert.equal(this.element.querySelector('.listing .owner').textContent.trim(), 'Owner: test-owner', 'Owner: test-owner');
  });

  test('should toggle wide class on click', async function(assert) {
    await render(hbs`{{rental-listing rental=rental}}`);
    assert.notOk(this.element.querySelector('.image.wide'), 'initially rendered small');
    await click('.image');
    assert.ok(this.element.querySelector('.image.wide'), 'rendered wide after click');
    await click('.image');
    assert.notOk(this.element.querySelector('.image.wide'), 'rendered small after second click');
  });
});